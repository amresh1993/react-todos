import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByPlaceholderText("Enter your todo here");
  const button = utils.getByText("ADD");
  return {
    input,
    button,
    ...utils,
  };
};

test("input should keep a value", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "abc" } });
  expect(input.value).toBe("abc");
});

test("button should be enabled when input has value", () => {
  const { input, button } = setup();
  expect(button.disabled).toBeTruthy();
  fireEvent.change(input, { target: { value: "abc" } });
  expect(button.disabled).toBeFalsy();
});
test("list element should be add", () => {
  const { input, button, ...others } = setup();
  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.click(button);
  const li = others.getByText("abc");
  expect(li).toBeInTheDocument();
});
test("list element should be completed onClick", () => {
  const { input, button, ...others } = setup();
  fireEvent.change(input, { target: { value: "abcd" } });
  fireEvent.click(button);
  const li = others.getByText("abcd");
  fireEvent.click(li);
  expect(li.className).toContain("item-cross");
});
test("list element should be not completed again onClick", () => {
  const { input, button, ...others } = setup();
  fireEvent.change(input, { target: { value: "abcde" } });
  fireEvent.click(button);
  const li = others.getByText("abcde");
  fireEvent.click(li);
  fireEvent.click(li);
  expect(li.className).not.toContain("item-cross");
});
test("remaining text visible when todo contain value", () => {
  const { ...others } = setup();
  const spanElem = others.getByText(/remaining/i);
  expect(spanElem).toBeInTheDocument();
});
