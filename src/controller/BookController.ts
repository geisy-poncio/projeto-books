import { BookService } from "../service/BookService"; 

export class BookController{
    constructor(
        private readonly bookService: BookService
    ){}

    async createBook (name: string, authorId: string) {
        console.log("BookController::createBook::Request received");
        return await this.bookService.createBook(name, authorId);
    }
}