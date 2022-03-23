const { response } = require("express")


// Como vamos a llamar a este middleware despues de validar JWT, si todo viene bien, podemos usar la 
// info recibida en la REQUEST req, enviada por el next()

const esAdminRole = (req, res = response, next) =>{

    if (!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        })
    }

    // Verificando si es admin o user
    const {rol, nombre} = req.usuario;
    
    if (rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es admin`
        }) 
    } 
    next();
}

const tieneRol= (...roles ) =>{ // Recibimos los argumentos de los roles 

    return ( req, res = response, next) =>{ // Debemos retornar la funcion para que no choque con el paso anterior
        console.log(roles, req.usuario.rol);

        // Validacion de JWT
        if (!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }
    
        if (!roles.includes(req.usuario.rol )){
            return res.status(401).json({
                msg: `El rol indicado no coincide con ninguno de estos roles ${roles}`
            }); 
        }

        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}


