import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RouterProvider} from "react-router-dom";
import { UserDataProvider } from "../context/userDataProvider";
import { router } from "../router/router";
import { createMemoryRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchContextProvider } from "../context/searchMovieProvider";

const mockUser = [{username: "test@gmail.com", password: "test123"}]

Object.defineProperty(global.window, "scrollTo", {
    value: vi.fn(),
    writable: true,
})

beforeEach(() => localStorage.clear());

vi.stubGlobal("localStorage", {
    getItem: vi.fn(() => JSON.stringify(mockUser)),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

beforeEach(() => {
    const mockResponse = new Response(
      JSON.stringify({ results: [{ key: "mockVideoKey" }] })
      {
        status: 200,
        headers: { 'Content-type': 'application/json' }
      }
    );
  
    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);
  });
  
  

describe("Protected Router", () => {
    it("should render the protected router if the user is logged in", async () => {
        localStorage.setItem("userMovieStreaming", JSON.stringify(mockUser))
        const data = localStorage.getItem("userMovieStreaming");
        console.log(data)
        const testRouter = createMemoryRouter(router.routes, {
            initialEntries: ["/detail/533535?title=Deadpool%20%26%20Wolverine"]
        });
        render(
            <UserDataProvider>
                <SearchContextProvider>
                    <RouterProvider router={testRouter} />
                </SearchContextProvider>
            </UserDataProvider>
        )
        await waitFor(() => {
            expect(screen.getByTitle('Deadpool & Wolverine')).toBeInTheDocument();
        });
    })
})
