const errorHandler = require("./error-handler");
const operatorsService = require('../service/operators-service')


module.exports=(io,socket)=>
{
    const addOperator=async(owner)=>
    {
        try
        {
            console.log(`${owner} is adding new op`)
            const operators = await operatorsService.add(owner);
            socket.emit("operators:getAll",operators);
        }
        catch(e)
        {
            errorHandler.emitError(socket,e);
        }       

    }

    const getAllOperators=async(owner)=>
    {
        try
        {
            console.log(`${owner} is wathcing`)
            const operators = await operatorsService.getAll(owner);
            socket.emit("operators:getAll",operators);
        }
        catch(e)
        {
            errorHandler.emitError(socket,e);
        }   
    }

    const getOperator=async(id,owner)=>
    {
        try
        {
            console.log(`${owner} is getting ${id}`)
            const operator = await operatorsService.get(id,owner);
            socket.emit("operators:get",operator);
        }
        catch(e)
        {
            errorHandler.emitError(socket,e);
        }   
    }

    const setOperator=async(id,owner,newop)=>
    {
        try
        {            
            const operator = await operatorsService.set(id, owner,newop);
            socket.emit("operators:get",operator);
        }
        catch(e)
        {
            errorHandler.emitError(socket,e);
        }  
    }

    const deleteOperator=async(id,owner)=>
    {
        try
        {            
            const operators = await operatorsService.delete(id,owner);
            socket.emit("operators:delete",operators);
        }
        catch(e)
        {
            errorHandler.emitError(socket,e);
        }  
    }

    socket.on("operators:getAll", getAllOperators);
    socket.on("operators:get", getOperator);
    socket.on("operators:set", setOperator);
    socket.on("operators:add", addOperator);
    socket.on("operators:delete", deleteOperator);

}



