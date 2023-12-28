//1
// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження типу змінної.

function isString (smth: any): smth is string {
    return typeof smth === 'string'
    // return String.toString(smth)
}

console.log(isString('singularity'))
console.log(isString(Infinity))
console.log(isString(true))



//2
// У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки.
// Використовуйте захисника типу для цього завдання.

function stringArray(arr: any[]): string[] | string {
    if (arr.length === 0) return 'empty data'
    const data = arr.filter(el => isString(el))
    return data.length >= 1 ? data : 'unappropriated data'
}

console.log(stringArray([1, 'a', 'b', true, {}, 'c']))
console.log(stringArray([]))
console.log(stringArray([true]))



//3
// У вас є об'єкт, який може містити довільні властивості.
// Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

type checkPropObject = {[key: string]: any}
function checkingProperty (obj: checkPropObject): string {
    return 'name' in obj && isString(obj.name)
        ?
        obj.name
        :
        "this property doesn't exist or has inappropriate type"
}

console.log(checkingProperty({name: 'Jack', age: 33}))
console.log(checkingProperty({born: 1990, gender: 'male'}))



//4
// Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип).
// Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

type Tage = {age: number}
type TisFired = {isFired: boolean}
type Toccupation = {occupation: string}

const isNumber = (arg: any): arg is number => {
    return typeof arg === 'number'
    // return Number.isInteger(arg)
}

const isBoolean = (arg: any): arg is boolean => {
    return typeof arg === "boolean"
}

function ordinaryObjectNarrowing(obj: Tage | TisFired | Toccupation): string {
    if ('age' in obj && isNumber(obj.age)) {
        return `${obj.age}`
    }
    else if ('isFired' in obj && isBoolean(obj.isFired)) {
        return `${obj.isFired}`
    }
    else if ('occupation' in obj && isString(obj.occupation)) {
        return `${obj.occupation}`
    } else {
        return 'Incorrect type or value'
    }
}

console.log(ordinaryObjectNarrowing({age: 21}))
console.log(ordinaryObjectNarrowing({occupation: "Buttons Pusher"}))
// console.log(ordinaryObjectNarrowing({junior: "no needs"}))  error



//5
// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число).
// Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.
function divideResponsibilities (smth: number | string | boolean): string {
    if (isNumber(smth)) {
        smth.toFixed(1)
        return `I have seen ${smth} times him trying to get job`
    } else if (isString(smth)) {
        smth.includes('a')
        return `He is lazy ${smth}, what have you been expecting?`
    } else {
        smth.valueOf()
        return smth ? 'Wow, he get the job' : `As expected`
    }
}

console.log(divideResponsibilities(51))



//6
// Створіть захисник типу, який перевірятиме, чи є передане значення функцією.
// Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

const isFunction = (arg: unknown): arg is Function => {
    return typeof arg === 'function'
}

function callFunction (arg: unknown): string {
    return isFunction(arg) ? arg() : "Not today JS fanboy"
}

function functionExample (): string {
    return "it's definitely a function"
}
console.log(callFunction(functionExample))
// console.log(callFunction("I'm assure you, it's a function, promise you Typescript")) //error



//7
// Створіть класи з ієрархією успадкування і потім напишіть функцію,
// яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.

enum enumOcuppation {
    GUEST = 'guest',
    USER = 'user',
    MODERATOR = 'moderator',
    ADMIN = 'admin'
}

class Guest {
    type = enumOcuppation.GUEST

    watchSite(): void{}
}

class User extends Guest {
    type = enumOcuppation.USER

    login(): void{}
    addToCart(): void{}
    pay(): void{}
}

class Moderator extends User {
    type = enumOcuppation.MODERATOR

    editInfo(): void{}
    deleteComment(): void{}
}

class Admin extends Moderator {
    type = enumOcuppation.ADMIN

    addSmthNew(): void{}
    giveModeratorPermissions(): void{}
}

const isUser = (person: any): person is User => {
    return person.type === enumOcuppation.USER
        && person instanceof User
        && 'login' in person
}

const isModerator = (person: any): person is Moderator => {
    return person.type === enumOcuppation.MODERATOR
        && person instanceof Moderator
        && 'editInfo' in person
}

const isAdmin = (person: any): person is Admin => {
    return person.type === enumOcuppation.ADMIN
        && person instanceof Admin
        && 'addSmthNew' in person
}

function indentifyPerson(person: Guest | User | Moderator | Admin): void {
    if (isUser(person)) {
        console.log(person.type)
        person.login()
    }
    else if (isModerator(person)) {
        console.log(person.type)
        person.editInfo()
    }
    else if (isAdmin(person)) {
        console.log(person.type)
        person.addSmthNew()
    }
    else {
        console.log(person.type)
        person.watchSite()
    }
}

indentifyPerson(new Moderator())