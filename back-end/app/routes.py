from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from . import models,schemas,database
from .auth import get_current_user
from .models import User
from . import security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


#Rotas de Usuários e Auth

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed = security.hash_password(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.email == form_data.username
    ).first()

    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="Email ou senha inválidos"
        )

    access_token = security.create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

#Rotas Clientes

@router.post("/clientes", response_model=schemas.ClienteResponse)
def criar_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_cliente = models.Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente 

@router.get("/clientes", response_model=list[schemas.ClienteResponse])
def listar_clientes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    clientes = db.query(models.Cliente).all()
    return clientes    

#Rotas Dividas 

@router.post("/dividas", response_model=schemas.DividaResponse)
def criar_divida(divida: schemas.DividaCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_divida = models.Divida(**divida.model_dump())
    db.add(db_divida)
    db.commit()
    db.refresh(db_divida)
    return db_divida


@router.get("/dividas", response_model=list[schemas.DividaResponse])
def listar_dividas(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    dividas = db.query(models.Divida).all()
    return dividas


@router.put("/dividas/{divida_id}/pagar", response_model=schemas.DividaResponse)
def pagar_divida(divida_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    divida = db.query(models.Divida).filter(models.Divida.id == divida_id).first()
    if not divida:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    divida.status = "pago"
    db.commit()
    db.refresh(divida)
    return divida   

@router.get("/dividas/{divida_id}", response_model=schemas.DividaResponse)
def get_divida(divida_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    divida = db.query(models.Divida).filter(models.Divida.id == divida_id).first()
    if not divida:
        raise HTTPException(status_code=404, detail="Divida não encontrada")
    return divida

@router.get("/dividas/pendentes", response_model=list[schemas.DividaResponse])
def listar_dividas_pendentes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    dividas_pendentes = db.query(models.Divida).filter(models.Divida.status == "pendente").all()
    return dividas_pendentes

#Rotas Dashboard

@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    total_recebido = db.query(models.Divida).filter(models.Divida.status == "pago").with_entities(models.Divida.valor).all()
    total_pendente = db.query(models.Divida).filter(models.Divida.status == "pendente").with_entities(models.Divida.valor).all()

    total_recebido = sum(v[0] for v in total_recebido)
    total_pendente = sum(v[0] for v in total_pendente)

    total_vencido = db.query(models.Divida).filter(models.Divida.status == "vencido").with_entities(models.Divida.valor).all()
    total_vencido = sum(v[0] for v in total_vencido)

    clientes_ativos = db.query(models.Cliente).count()

    return {
        "total_recebido": total_recebido,
        "total_pendente": total_pendente,
        "total_vencido": total_vencido,
        "clientes_ativos": clientes_ativos
    }

@router.get("/dashboard/cobrancas-recentes")
def cobrancas_recentes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    dividas = db.query(models.Divida).order_by(models.Divida.id.desc()).limit(5).all()

    return dividas    

