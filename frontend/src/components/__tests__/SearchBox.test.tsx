import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "../SearchBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

test("search box renders all components", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SearchBox />
    </QueryClientProvider>
  );
  const buttonElement = screen.getByText(/Search!/i);
  const inputElement = screen.getByPlaceholderText(/Enter tag.../i);

  expect(buttonElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test("input is blank after button click", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SearchBox />
    </QueryClientProvider>
  );
  const buttonElement = screen.getByText(/Search!/i);
  const inputElement = screen.getByPlaceholderText(/Enter tag.../i);
  fireEvent.change(inputElement, { target: { value: "TEST" } });

  expect(inputElement).toHaveValue("TEST");

  fireEvent.click(buttonElement);

  expect(inputElement).toHaveValue("");
});
