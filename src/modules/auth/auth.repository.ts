let users: any[] = [];
let id = 0;

export const create = (data: any) => {
    const user = { id: id++, ...data };
    users.push(user);
    return user;
}

export const findByEmail = (email: string) => {
    return users.find((u) => u.email === email);
}