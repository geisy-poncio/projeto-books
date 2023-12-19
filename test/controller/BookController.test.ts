import { describe, expect, jest, test } from "@jest/globals";
import { BookRepositoryInterface } from "../../src/repository/BookRepositoryInterface"; 
import { BookService } from "../../src/service/BookService";
import { BookController } from "../../src/controller/BookController";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { bookEntities } from "../mocks/databaseEntities";
import { Output } from "../../src/util/Output";
import { AuthorRepositoryInterface } from "../../src/repository/AuthorRepositoryInterface"; 
import { AuthorService } from "../../src/service/AuthorService"; 
import { mock } from "jest-mock-extended";
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput 
} from "../../src/dto/bookDTO";

describe ("BookController", () => {
    const authorRepository = mock<AuthorRepositoryInterface>();
    const authorService = new AuthorService(authorRepository);
    
    const bookRepository = mock<BookRepositoryInterface>();
    const bookService = new BookService(bookRepository, authorService);
    const bookController = new BookController(bookService);

    describe("createBook", () => {
        const createBookDtoInput = new CreateBookDtoInput("Jane Doe Book", "1");

        test("Should return SUCCESS when creating a new book", async () => {
            jest.spyOn(bookService, "createBook").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.createBook(createBookDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("getBookById", () => {
        const getBookByIdDtoInput = new GetBookByIdDtoInput("1");

        test("Should return SUCCESS when finding book", async () => {
            jest.spyOn(bookService, "getBookById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.getBookById(getBookByIdDtoInput);
    
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("getAllBooks", () => {
        test("Should return SUCCESS when finding books", async () => {
            jest.spyOn(bookService, "getAllBooks").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.getAllBooks();
    
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("updateBookById", () => {
        const updateBookByIdDtoInput = new UpdateBookByIdDtoInput("1", "John Doe Book", "1");

        test("Should return SUCCESS when updating book", async () => {
            jest.spyOn(bookService, "updateBookById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.updateBookById(updateBookByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("deleteBookById", () => {
        const deleteBookByIdDtoInput = new DeleteBookByIdDtoInput("1");

        test("Should return SUCCESS when deleting book", async () => {
            jest.spyOn(bookService, "deleteBookById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.deleteBookById(deleteBookByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})

