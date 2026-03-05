from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import router as api_router
from .auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Cobrança")

# CONFIGURAÇÃO CORS
origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas públicas
app.include_router(auth_router)

# Rotas protegidas
app.include_router(api_router, prefix="/api")