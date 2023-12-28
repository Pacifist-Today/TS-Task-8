//1
// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження типу змінної.

function isString (smth: unknown): smth is string {
    return typeof smth === 'string'
}

console.log(isString('singularity'))
console.log(isString(Infinity))
console.log(isString(true))



//2
// У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки.
// Використовуйте захисника типу для цього завдання.

function stringArray(arr: any[]): string[] | string {
    if (arr.length === 0) return 'empty data'
    const data = arr.filter(el => typeof el === 'string')
    return data.length >= 1 ? data : 'unappropriated data'
}

console.log(stringArray([1, 'a', 'b', true, {}, 'c']))
console.log(stringArray([]))
console.log(stringArray([true]))



//3
// У вас є об'єкт, який може містити довільні властивості.
// Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

function checkingProperty (obj: {[key: string]: any}): string {
    return obj.name && typeof obj.name === 'string'
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

function ordinaryObjectNarrowing(obj: Tage | TisFired | Toccupation): string {
    if ('age' in obj) {
        obj.age.toExponential(2)
        return `${obj.age}`
    }
    else if ('isFired' in obj) {
        obj.isFired.valueOf()
        return `${obj.isFired}`
    }
    else {
        obj.occupation.charAt(5)
        return `${obj.occupation}`
    }
}

console.log(ordinaryObjectNarrowing({age: 21}))
console.log(ordinaryObjectNarrowing({occupation: "Buttons Pusher"}))



//5
// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число).
// Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.
function divideResponsibilities (smth: number | string | boolean): string {
    if (typeof smth === 'number') {
        smth.toFixed(1)
        return `I have seen ${smth} times him trying to get job`
    } else if (typeof smth === 'string') {
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

type Tfunction = () => {}

function callFunction (func: Tfunction): string {
    if (typeof func === 'function') {
        return functionExample()
    } else {
        return "Not today JS fanboy"
    }
}

function functionExample (): string {
    return "it's definitely a fucntion"
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


function indentifyPerson(obj: Guest | User | Moderator | Admin): void {
    if (obj.type === enumOcuppation.GUEST && obj instanceof Guest) {
        console.log(obj.type)
        obj.watchSite()
    } else if (obj.type === enumOcuppation.USER && obj instanceof User) {
        console.log(obj.type)
        obj.login()
    } else if (obj.type === enumOcuppation.MODERATOR && obj instanceof Moderator) {
        console.log(obj.type)
        obj.editInfo()
    } else if (obj.type === enumOcuppation.ADMIN && obj instanceof Admin) {
        console.log(obj.type)
        obj.addSmthNew()
    }
}

indentifyPerson(new Moderator())