const express = require('express');
const server = express();
server.use(express.json());

const clientes = [];
const carros = [];
const servicos = [];
const agendamentos = [];

//clientes
//Apenas não verifica o primeiro cadastro(talvez seja o valor do id?)
server.get('/clientes', (req,res) => {
    res.json(clientes);
});
server.post('/clientes', (req,res) => {
    const nomeCliente = req.body.nomeCliente;
    const telefoneCliente = req.body.telefoneCliente;
    let id = 0;
    clientes.forEach(client => {
        if(nomeCliente.length < 3){
            res.status(404).json({message: "'nome' deve conter no mínimo 3 caracteres"});
        }
        if(nomeCliente.length > 100){
            res.status(404).json({message: "'nome' deve conter no máximo 100 caracteres"});
        }
        if(telefoneCliente.length < 11 || telefoneCliente.length > 11){
            res.status(404).json({mensage: "'telefone' deve conter exatamente 11 dígitos"});
        }
        if(client.id < id){
            id = client.id;
        }
    })
    clientes.push({id : id + 1, nomeCliente,telefoneCliente});
    res.status(201).json({message:"Cliente cadastrado com sucesso"});

});
server.get('/clientes/:id', (req,res) => {
    const id = Number.parseInt(req.params.id)
    res.status(200).json(clientes.find(client => client.id === id));

});
server.put('/clientes/:id', (req,res) => {
    const idCliente = req.params.idCliente;
    const nomeCliente = req.body.nomeCliente;
    const telefoneCliente = req.body.telefoneCliente;
    const client = clientes.find(c => c.idCliente === parseInt(idCliente));
    if(idCliente < 0 || idCliente == 0){
        res.status(404).json({message: "'codigo' deve ser maior que 0"});
    }
    if(nomeCliente.length < 3){
        res.status(404).json({message: "'nome' deve conter no mínimo 3 caracteres"})
    }
    if(nomeCliente.length > 100){
        res.status(404).json({message: "'nome' deve conter no máximo 100 caracteres"})
    }
    if(telefoneCliente.length < 11 && telefoneCliente.length > 11){
        res.status(404).json({message: {mensagem: "'telefone' deve conter exatamente 11 dígitos"}})
    }
    if(client){
        client.nomeCliente = nomeCliente;
        client.telefoneCliente = telefoneCliente;
        res.status(201).json({message: "Cliente atualizado com sucesso"});
    }else{
        res.status(404).json({message: "Cliente não encontrado"});
    }

});
server.delete('/clientes/:id', (req,res) => {
    const idCliente = req.params.idCliente;
    const index = clientes.findIndex(c => c.idCliente === Number.parseInt(idCliente));
    if(index !== -1){
        clientes.splice(index,1);
        res.status(200).json({message:"Cliente removido com sucesso"});
    }else{
        res.status(404).json({message:"Cliente não encontrado"});
    }
});

//carros

server.get('/carros', (req,res) => {
    res.json(carros);
});
server.post('/carros', (req,res) => {
    const idCliente = req.params.idCliente;
    const marcaCarro = req.body.marcaCarro;
    const modeloCarro = req.body.modeloCarro;
    const tamanhoCarro = req.body.tamanhoCarro;
    let id = 0;
    carros.forEach(cars => {
        if(marcaCarro.length < 3){
            res.status(404).json({mensage: "'marca' deve conter mínimo 3 caracteres"});
        }
        if(marcaCarro.length > 50){
            res.status(404).json({message: "'marca' deve conter no máximo 50 caracteres"});
        }
        if(modeloCarro.length < 2){
            res.status(404).json({mensage:"'modelo' deve conter no mínimo 2 caracteres"});
        }
        if(modeloCarro.length > 50){
            res.status(404).json({message: "'modelo' deve conter no máximo 50 caracteres"});
        }
        if(clientes.idCliente !== -1){
            idCliente = cars.idCliente;
        }else{
            res.status(404).json({mensage: "'id_cliente' não corresponde a um cliente cadastrado"})
        }
        if(cars.id > id){
            id = cars.id;
        }
    })
    carros.push({id : id +1, marcaCarro,modeloCarro,tamanhoCarro,idCliente});
    res.status(281).json({message:"Carro cadastrado com sucesso"});


});
server.get('/carros/:id', (req,res) => {
    const id = Number.parseInt(req.params.id)
    res.status(200).json(carros.find(cars => cars.id === id));

});
server.put('/carros/:id', (req,res) => {
    const idCliente = req.params.idCliente;
    const idCarros = req.params.idCarros;
    const marcaCarro = req.body.marcaCarro;
    const modeloCarro = req.body.modeloCarro;
    const tamanhoCarro = req.body.tamanhoCarro;
    const cars = carros.find(c => c.idCarros === parseInt(idCarros));
    if(idCarros < 0 || idCarros == 0){
        res.status(404).json({message: "'codigo' deve ser maior que 0"});
    }
    if(marcaCarro.length < 3){
        res.status(404).json({message: "'marca' deve conter no mínimo 3 caracteres"})
    }
    if(marcaCarro.length > 100){
        res.status(404).json({message: "'marca deve conter no máximo 50 caracteres"})
    }
    if(modeloCarro.length < 2){
        res.status(404).json({mensage:"'modelo' deve conter no mínimo 2 caracteres"});
    }
    if(modeloCarro.length > 50){
        res.status(404).json({message: "'modelo' deve conter no máximo 50 caracteres"});
    }
    if(cars.idCliente !== -1){
        idCliente = cars.idCliente;
    }else{
        res.status(404).json({mensage: "'id_cliente' não corresponde a um cliente cadastrado"})
    }
    if(cars){
        cars.idCliente = idCliente;
        cars.idCarros = idCarros;
        cars.marcaCarro = marcaCarro;
        cars.modeloCarro = modeloCarro;
        cars.tamanhoCarro = tamanhoCarro;
        res.status(201).json({message: "Carro atualizado com sucesso"})
    }

});
server.delete('/carros/:id', (req,res) => {
    const idCarros = req.params.idCarros;
    const index = carros.findIndex(c => c.idCarros === Number.parseInt(idCarros));
    if(index !== -1){
        carros.splice(index,1);
        res.status(200).json({message:"Carro removido com sucesso"});
    }else{
        res.status(404).json({message:"Carro não encontrado"});
    }
});

//serviços

server.get('/servicos', (req,res) => {
    res.json(carros);
});
server.post('/servicos', (req,res) => {
    const descricao = req.body.descricao;
    const valores = req.body.valores;
    let id = 0;
    servicos.forEach(servs => {
        if(descricao.length < 5){
            res.status(404).json({mensage: "'descricao' deve conter mínimo 5 caracteres"});
        }
        if(descricao.length > 100){
            res.status(404).json({message: "'Descricao' deve conter no máximo 100 caracteres"});
        }
        if(servs.id > id){
            id = servs.id;
        }
    })
    servicos.push({id : id +1, descricao,valores});
    res.status(281).json({message:"Carro cadastrado com sucesso"});


});
server.get('/servicos/:id', (req,res) => {
    const id = Number.parseInt(req.params.id)
    res.status(200).json(servicos.find(servs => servs.id === id));

});
server.put('/servicos/:id', (req,res) => {
    const idServico = req.params.idServico;
    const descricao = req.body.descricao;
    const valores = req.body.valores;
    const servs = servicos.find(c => c.idServico === parseInt(idServico));
    if(idServico < 0 || idServico == 0){
        res.status(404).json({message: "'codigo' deve ser maior que 0"});
    }
    if(descricao.length < 5){
        res.status(404).json({mensage: "'Descricao' deve conter mínimo 5 caracteres"});
    }
    if(descricao.length > 100){
        res.status(404).json({message: "'Descricao' deve conter no máximo 100 caracteres"});
    }
    if(servs){
        server.idServico = idServico;
        servs.descricao = descricao;
        servs.valores = valores;
    }
    res.status(201).json({message: "Servico atualizado com sucesso"})

});
server.delete('/servicos/:id', (req,res) => {
    const idServico = req.params.idServico;
    const index = servicos.findIndex(s => s.idServico === Number.parseInt(idServico));
    if(index !== -1){
        servicos.splice(index,1);
        res.status(200).json({message:"Serviço removido com sucesso"});
    }else{
        res.status(404).json({message:"Serviço não encontrado"});
    }
});

//agendamentos

server.get('/agendamentos', (req,res) => {
    res.json(agendamentos);
});
server.post('/agendamentos', (req,res) => {
    const idCarro = req.params.idCarro;
    const idServico = req.params.idServico;
    const dataEhora = req.body.dataEhora;
    let id = 0;
    agendamentos.forEach(agends => {
        if(carros.idCarro !== idCarro){
            res.status(404).json({message:"'id_carro' não corresponde a um carro cadastrado"});
        }
        if(servicos.idServico !== idServico){
            res.status(404).json({message: "'id_servico' nao corresponde a um serviço cadastrado"});
        }
        if(dataEhora === 0){
            res.status(404).json({message: "data_hora deve ser informado"});
        }

    })
    agendamentos.push({id : id +1, dataEhora});
    res.status(281).json({message:"Agendamento cadastrado com sucesso"});


});


server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

module.exports = server();