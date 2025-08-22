import validator from 'validator';

export const isvalidSignUp= (req)=>{
    const{ name, address, email, password} = req.body;
    if(!name || !address || !email || !password){ 
        throw new Error('All fields are required');
    } else if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Pleasse enter a strong password');
    }
}

