import {prisma} from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getContact = async (query: string, currentpage: number) => {
    const offset = (currentpage - 1) * ITEMS_PER_PAGE;
    try {
        await new Promise ((resolve) => setTimeout(resolve, 2000));
        const contact = await prisma.contact.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                OR: [
                    {
                        name:{
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        phone:{
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                ]
            }
        });
        return contact;
    } catch (error) {
        throw new Error("Failed to fetch contact data");
    }
};

export const getContactById = async (id: string) => {
    try {
        const contact = await prisma.contact.findUnique({
            where:{id}
        });
        return contact;
    } catch (error) {
        throw new Error("Failed to fetch contact data");
    }
};

export const getContactPages = async (query: string) => {
    try {
        const contact = await prisma.contact.count({
            where: {
                OR: [
                    {
                        name:{
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        phone:{
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                ]
            }
        });
        const totalPages = Math.ceil(Number(contact) / ITEMS_PER_PAGE )
        return totalPages;
    } catch (error) {
        throw new Error("Failed to fetch contact data");
    }
};