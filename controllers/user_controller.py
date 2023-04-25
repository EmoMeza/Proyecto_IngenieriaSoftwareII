import db.database as database
from flask import Blueprint, jsonify, request

user_controller = Blueprint('user_controller', __name__)

db = database.db
app = database.app

async def add_desarrollador(nombre, email, id_rol):
    desarrollador = database.desarrollador(nombre, email, id_rol)
    db.session.add(desarrollador)
    db.session.commit()

async def add_cliente(nombre, email):
    cliente = database.cliente(nombre, email)
    db.session.add(cliente)
    db.session.commit()

async def add_id_rol(nombre):
    rol = database.rol(nombre)
    db.session.add(rol)
    db.session.commit()