// import { chromium } from 'playwright';

// const { faker } = require('@faker-js/faker');

export function getRandomString(length: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

export function getRandomEmail(): string {
    const num = Math.floor(Math.random() * 9999999) + 150;
    const email = `new_user${num}@yopmail.com`;
    return email;
}

export function getRandomInt(): number {
    return Math.floor(Math.random() * 1001); // Generates random integer from 0 to 1000
}

export function getTodaysDate(): string {
    const today = new Date();
    const todaysDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    return todaysDate;
}

function getFutureDate(daysNumber: number): string {
    const today = new Date();
    const futureDate = new Date(today.setDate(today.getDate() + daysNumber));
    const futureDateString = `${futureDate.getMonth() + 1}/${futureDate.getDate()}/${futureDate.getFullYear()}`;
    return futureDateString;
}

function getTimeOfDay(): string {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'morning';
    } else if (currentHour < 16) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

