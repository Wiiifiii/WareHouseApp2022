import { render, screen } from '@testing-library/react';
import Inventory from './Inventory';
import { MemoryRouter as Router } from 'react-router-dom';

it('Inventory Component test', async function (){

<Router>
  const response = new Inventory();
  var output = await response.getAllItems();
  expect(output.stock[0].id).toEqual('43')
  
  </Router>
})