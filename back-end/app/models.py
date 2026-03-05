from .database import Base
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)


class Cliente(Base):
    __tablename__ = "clientes"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    telefone = Column(String, nullable=False, unique=True)
    dividas = relationship("Divida", back_populates="cliente")
    is_active = Column(Boolean, default=True)

class Divida(Base):
    __tablename__ = "dividas"
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)
    descricao = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    data_vencimento = Column(Date, nullable=False)
    data_pagamento = Column(Date, nullable=True)
    valor_pago = Column(Float, nullable=True)
    status = Column(String, default="pendente")
    criado_em = Column(DateTime, default=datetime.utcnow)
    cliente = relationship("Cliente", back_populates="dividas")


class HistoricoCobrancas(Base):
    __tablename__ = "historico_cobrancas"
    id = Column(Integer, primary_key=True, index=True)
    divida_id = Column(Integer, ForeignKey("dividas.id"), nullable=False)
    enviado_em = Column(DateTime, default=datetime.utcnow)
    messagem = Column(String)
    status = Column(String, default="enviado")
