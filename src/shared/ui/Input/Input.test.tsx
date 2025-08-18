// Input.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders label linked with htmlFor to the input `name`", () => {
    render(<Input name="email" label="Email" />);
    const label = screen.getByText("Email");
    const input = screen.getByRole("textbox");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("name", "email");
  });

  it("shows required asterisk when `required` is true", () => {
    render(<Input name="email" label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render label when `label` is not provided", () => {
    render(<Input name="username" />);
    // there is still an input
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // no label element
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("sets aria-invalid and error message when `error` is present", () => {
    render(<Input name="email" label="Email" error="Invalid email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("applies destructive classes on error", () => {
    const { container } = render(
      <Input name="email" label="Email" error="Invalid email" />
    );
    const input = container.querySelector('[data-slot="input"]') as HTMLElement;
    expect(input.className).toMatch(/\bborder-destructive\b/);
    // label becomes destructive color too
    const label = screen.getByText("Email");
    expect(label.className).toMatch(/\btext-destructive\b/);
  });

  it("renders start and end icons and adjusts paddings", () => {
    const Icon = () => <svg data-testid="icon" />;
    const { container, rerender } = render(
      <Input name="q" label="Query" iconStart={<Icon />} iconEnd={<Icon />} />
    );
    const input = container.querySelector('[data-slot="input"]') as HTMLElement;
    expect(screen.getAllByTestId("icon")).toHaveLength(2);
    expect(input.className).toMatch(/\bpl-9\b/);
    expect(input.className).toMatch(/\bpr-9\b/);

    rerender(<Input name="q" label="Query" iconStart={<Icon />} />);
    const inputLeft = container.querySelector(
      '[data-slot="input"]'
    ) as HTMLElement;
    expect(inputLeft.className).toMatch(/\bpl-9\b/);
    expect(inputLeft.className).toMatch(/\bpr-3\b/);

    rerender(<Input name="q" label="Query" iconEnd={<Icon />} />);
    const inputRight = container.querySelector(
      '[data-slot="input"]'
    ) as HTMLElement;
    expect(inputRight.className).toMatch(/\bpl-3\b/);
    expect(inputRight.className).toMatch(/\bpr-9\b/);
  });

  it("merges extra className", () => {
    const { container } = render(
      <Input name="nick" className="ring-2 data-[x]:underline" />
    );
    const input = container.querySelector('[data-slot="input"]') as HTMLElement;
    expect(input.className).toMatch(/\bring-2\b/);
    expect(input.className).toMatch(/data-\[x\]:underline/);
  });

  it("forwards type, placeholder and onChange", () => {
    const onChange = vi.fn();
    render(
      <Input
        name="pass"
        type="password"
        placeholder="Password"
        onChange={onChange}
      />
    );
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(input).toHaveAttribute("type", "password");
    fireEvent.change(input, { target: { value: "secret" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("secret");
  });

  it("respects disabled prop", () => {
    render(<Input name="nick" disabled />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('keeps `data-slot="input"` for targeting', () => {
    const { container } = render(<Input name="any" />);
    const input = container.querySelector('[data-slot="input"]');
    expect(input).toBeInTheDocument();
  });
});
