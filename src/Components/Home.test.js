import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Home Component Test', ()=> {
   test('Render Home component',()=>{
        //Rendering the component we want to test
        render(
          <Router>
        <Home/>
        </Router>
        );
       // Finding the elements
         const x = screen.getByText(/WareHouse/i);
        //Assertion
         expect(x).toBeInTheDocument();
         const divElemnt = screen.getByTestId('div1');
         expect(divElemnt).toBeInTheDocument();
    })
})