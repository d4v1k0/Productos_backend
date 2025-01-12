const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido)
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });

        if (!pedido) {
            res.status(404).json({ mensaje: 'Ese pedido no existe' });
            return;
        }

        // Mostrar el pedido
        res.json(pedido);
    } catch (error) {
        // Manejar cualquier error
        console.error("Error al buscar el pedido:", error);
        res.status(500).json({ mensaje: 'Hubo un error al buscar el pedido' });
    }
}

// Actualizar el pedido via ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        } )
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

// elimina un pedido por su id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id : req.params.idPedido});
        res.json({ mensaje : 'El pedido se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}