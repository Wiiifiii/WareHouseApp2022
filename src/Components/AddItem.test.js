import { render, screen } from '@testing-library/react';
import AddItem from "./AddItem";
import { MemoryRouter as Router } from 'react-router-dom';

describe('AddItem 1 test', ()=> {
   test('Render AddItem component',()=>{
        //Rendering the component we want to test
        render(
            <Router>
        <AddItem/>
        </Router>
        );
        //Finding the elements
         const hElement = screen.getByText('Add New Product');
        //Assertion
         expect(hElement).toBeInTheDocument();
     
    })
})
