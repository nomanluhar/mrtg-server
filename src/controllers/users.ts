import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { Users } from '../entity/User';
import { Mrtg_info } from '../entity/mrtg';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = getRepository(Users);

  const user = await userRepository.findOne({
    email
  });

  if (!user) {
    res.status(400).send({ message: 'Invalid email or password' });
  } else {
    const result = await bcrypt.hash(password, user.password);
    // console.log(user)
    if (result) {
      res.status(200).send({ message: 'Login success', type: user.user_type });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    };
  };
};

export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(Users);

    const customers = await userRepository.find({ user_type: 'customer' });

    res.status(200).send({ message: 'Customers get', customers });
  } catch (error) {
    res.status(400).send({ message: error.message });
  };
};

export const getSingleCustomer = async (req: Request, res: Response) => {
  // try {
  //   const userRepository = getRepository(Users);
  //   const id = req.params.id
  //   const customer = await userRepository.findByIds({ id });
  //   // res.status(200).send({ message: 'Customers get', customers });
  // } catch (error) {
  //   res.status(400).send({ message: error.message });
  // };
};

export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { full_name, email, user_name, password, mrtg } = req.body;
    let addCustomer = new Users();
    addCustomer.full_name = full_name;
    addCustomer.email = email;
    addCustomer.user_name = user_name;
    addCustomer.user_type = 'customer';
    addCustomer.password = await bcrypt.hash(password, 10);;

    const userRepository = getRepository(Users);
    await userRepository.save(addCustomer);

    if (mrtg && mrtg.length) {
      const mrtgRepository = getRepository(Mrtg_info);
      await mrtg.forEach(async (obj) => {
        let addMrtg = new Mrtg_info();
        addMrtg.name = obj.name;
        addMrtg.url = obj.url;
        addMrtg.customer_id = addCustomer.id;

        await mrtgRepository.save(addMrtg);
      });
    };
    res.status(200).send({ message: 'Customers added', addCustomer });
  } catch (error) {
    res.status(400).send({ message: error.message });
  };
};

export const editCustomer = async (req: Request, res: Response) => {
  try {

  } catch (error) {
    res.status(400).send({ message: error.message });
  };
};

export const removeCustomer = async (req: Request, res: Response) => {
  try {

  } catch (error) {
    res.status(400).send({ message: error.message });
  };
};

