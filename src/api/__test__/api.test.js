import fetchMock from "jest-fetch-mock";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { setupApiStore } from "../../util/testUtils";
import { api } from "..";

const mockData = { name: "fcp", duration: 3, createdText: "21:01" };

const updateTimeout = 5000;

beforeEach(() => {
  fetchMock.resetMocks();
});

const wrapper = ({ children }) => {
  const storeRef = setupApiStore(api);
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe("server api", () => {
  test("successful response", () => {
    const storeRef = setupApiStore(api);
    fetchMock.mockResponse(JSON.stringify([mockData]));

    return storeRef.store
      .dispatch(api.endpoints.analytics.initiate(undefined))
      .then((action) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([mockData]);
      });
  });

  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify([mockData]));
    const { result, waitForNextUpdate } = renderHook(
      () => api.useAnalyticsQuery(undefined),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

  it("Internal Server Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => api.useAnalyticsQuery(undefined),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isError).toBe(true);
  });
});
