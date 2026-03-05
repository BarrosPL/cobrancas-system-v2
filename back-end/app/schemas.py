from pydantic import BaseModel
from datetime import date
from typing import Optional

# ================================
# CLIENTES
# ================================

class ClienteCreate(BaseModel):
    nome: str
    email: str
    telefone: Optional[str] = None


class ClienteUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[str] = None
    telefone: Optional[str] = None
    is_active: Optional[bool] = None


class ClienteResponse(BaseModel):
    id: int
    nome: str
    email: str
    telefone: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


# ================================
# DIVIDAS
# ================================

class DividaCreate(BaseModel):
    cliente_id: int
    descricao: str
    valor: float
    data_vencimento: date


class DividaUpdate(BaseModel):
    descricao: Optional[str] = None
    valor: Optional[float] = None
    data_vencimento: Optional[date] = None
    status: Optional[str] = None


class DividaResponse(BaseModel):
    id: int
    cliente_id: int
    descricao: str
    valor: float
    data_vencimento: date
    status: str

    class Config:
        from_attributes = True


# ================================
# AUTENTICAÇÃO
# ================================

class UserCreate(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# ================================
# DASHBOARD
# ================================

class DashboardStats(BaseModel):
    total_recebido: float
    total_pendente: float
    total_vencido: float
    clientes_ativos: int


class FinancialFlow(BaseModel):
    month: str
    recebido: float
    pendente: float
    vencido: float

