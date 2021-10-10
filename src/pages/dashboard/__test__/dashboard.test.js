import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import Dashboard from "../index";
import { api } from "../../../api";
import { setupApiStore } from "../../../util/testUtils";
import { Provider } from "react-redux";

const mockData = { name: "fcp", duration: 3, createdText: "21:01" };

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Dashboard page", () => {
  it("should have render all charts", async () => {
    const storeRef = setupApiStore(api);
    fetchMock.mockResponse(JSON.stringify([mockData]));
    render(
      <Provider store={storeRef.store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.queryAllByLabelText("card-title").length).toBe(4);
  });

  it("should have empty page", async () => {
    const storeRef = setupApiStore(api);
    render(
      <Provider store={storeRef.store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.queryAllByLabelText("card-title").length).toBe(4);
  });
});
