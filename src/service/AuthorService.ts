import { AuthorRepository } from "../repository/AuthorRepository";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";


export class AuthorService {
    constructor(
        private readonly  authorRepository: AuthorRepository
    ) {}

    async createAuthor(name: string): Promise<Output> {
        let findAuthor = await this.authorRepository.getAuthorByName(name);

        if (findAuthor) {
            console.log("AuthorService::createAuthor::Author exists");
            return new Output(apiStatusCode.AUTHOR_EXISTS);
        }

        console.log("AuthorService::createAuthor::Forwarding to save");
        const savedAuthor = await this.authorRepository.saveAuthor({name});
        return new Output(apiStatusCode.SUCCESS, savedAuthor);   
    }

    async getAuthorById (authorId: string): Promise<Output> {
        console.log("AuthorService::getAuthorById::Forwarding the search to the author by id");
        const findAuthor = await this.authorRepository.getAuthorById(authorId);

        if (!findAuthor) {
            console.log("AuthorService::getAuthorById::Author does not exists");
            return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }

        return new Output(apiStatusCode.SUCCESS, findAuthor);
    }    

    async getAllAuthors (): Promise<Output> {
        console.log("AuthorService::getAllAuthors::Forwarding the research to all authors");
        const findAuthor = await this.authorRepository.getAllAuthors();

        return new Output(apiStatusCode.SUCCESS, findAuthor);
    }    

    async updateAuthor (authorId: string, nameAuthor: string): Promise<Output> {
        let output = await this.getAuthorById(authorId);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return output;
        }
        console.log("AuthorService::updateAuthor::Forwarding for update");
        const updatedAuthor = await this.authorRepository.updateAuthor(authorId, nameAuthor);
        return new Output(apiStatusCode.SUCCESS, updatedAuthor);
    }

    async deleteAuthor (authorId: string): Promise<Output> {
        let output = await this.getAuthorById(authorId);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return output;
        }
        console.log("AuthorService::deleteAuthor::Forwarding for delete");
        const deleteAuthor = await this.authorRepository.deleteAuthor(authorId);
        return new Output(apiStatusCode.SUCCESS, deleteAuthor);
    }
}
