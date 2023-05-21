import random
import os
from flask import Flask, render_template, request, url_for, redirect, escape, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask import abort
import db.database as database
from controllers.report_controller import report_controller
from controllers.user_controller import user_controller
from controllers.product_controller import product_controller
from controllers.encargado_controller import encargado_controller
from flask_cors import CORS

db = database.db
app = database.app
app.register_blueprint(report_controller)
app.register_blueprint(user_controller)
app.register_blueprint(product_controller)
app.register_blueprint(encargado_controller)
CORS(app)

with app.app_context():
    db.session.commit()

@app.route('/')
@app.route('/index')
def index():
    cliente=database.cliente.query.all()
    return cliente[0].nombre

@app.route('/reporte/<int:id>')
def reporte(id):
    try:
        title_reporte=database.reporte.query.filter_by(id=id).first().titulo
        description_reporte=database.reporte.query.filter_by(id=id).first().descripcion
        return render_template('reporte.html', title_reporte=title_reporte, description_reporte=description_reporte)
    except:
        abort(404)

@app.route('/producto/<int:id>')
def producto(id):
    try:
        title_producto=database.producto.query.filter_by(id=id).first().nombre
        #check if the id_developer is in the database
        if database.desarrollador.query.filter_by(id=id).first() == None:
            developer_name="No hay desarrollador asignado"
            return render_template('producto.html', title_producto=title_producto, developer_name=developer_name)
        developer_name= "Falta implementar"
        return render_template('producto.html', title_producto=title_producto, developer_name=developer_name)
    except:
        abort(404)



if '__name__' == '__main__':
    app.run(host='192.168.1.69', port=8081)
