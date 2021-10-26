import { render, screen } from '@testing-library/react';
import App from './App';

// test('function sum returns sum of two arguments', () => {
//   render(<ProductPage />);
//   console.log(ProductPage.sum)
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// });

//test renders, not functions
//if you really need to test the function, break it out of component

// const sumPositiveNumbers = (number1, number2) => {
//     if (number1 < 0 || number2 < 0) {
//         throw new Error("one of the numbers is negative")
//     }
//     return number1+number2;
// }

describe("When there are no loading errors", () => {
    beforeEach(() => {
        render(<App />)
    })
    test("should render the App component without crashing", () => {
      //this is a explicit assertion
      render(<App />);
      //screen shows what is in the JSX of the file
      //Is actually html
    //   screen.debug();
    });

    //this would work if text was not dynamically rendered. Maybe if I did Item name: unicorn
    // test("should select the data that is being passed to the ProductItemContainer component", () => {
    //     render(<ProductPage />);
    //     //implicit assertion
    //     //Exact match
    //     // screen.getByText("Input:")
    //     //Not exact match, using regular expression
    //     // screen.getByText(/Input/);
    //     //explicit assertion
    //     expect(screen.getByText("Input:")).toBeInTheDocument();
    //     expect(screen.getByText("Input:")).not.toBeInTheDocument();
    // });

    // test("should select the input element by its role", () => {
    //     render(<ProductPage />);
    //     screen.getByRole('input');
    // });

    // test("should select the input element by its role w/ queryByRole", () => {
    //     render(<ProductPage />);
    //     const result = screen.queryByRole('blah');
    //     console.log(result)
    //      null because blah doesn't exist as a role
    //     expect(screen.queryByRole('blah')).tobeNull();
    // });
  // });



// //inside describe is test cases
// //describe is also called a test suite
// describe("when the arguments passed are positive numbers", () => {
//     //test should start with should
//     test('should return the right answer', () => {
//         // render(<ProductPage />);
//         // console.log(ProductPage.sum)
//       //   const linkElement = screen.getByText(/learn react/i);
//       //   expect(linkElement).toBeInTheDocument();
//       //this is assertion
//         expect(sumPositiveNumbers(4, 5)).toBe(9);
//       });
// });

// describe("when one of the arguments is a negative number", () => {
//     test('should throw an error', () => {
//         let error;
//         try {
//             sumPositiveNumbers(-1, 5);
//         } catch (err) {
//             error = err;
//         }
//         //either one works
//         // expect(error).toBeDefined();
//         expect(error.message).toBe("one of the numbers is negative")
//     });
})