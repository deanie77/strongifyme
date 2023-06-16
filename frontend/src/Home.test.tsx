// JEST
// TODO: write for unit testing solo functions
// TODO: component testing do with Cypress

import { render, screen } from '@testing-library/react'

import { Home } from './pages'

test("Render page: 'Home' and get it's heading", () => {
  render(<Home />)

  // TODO: get ID from json file, folder /tests/
  const headingEl = screen.getByTestId('heading-home')
  expect(headingEl).toBeInTheDocument()
})
