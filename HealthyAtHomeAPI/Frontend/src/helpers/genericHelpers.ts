export const getLocalDateFromString = (date: string) => {
    return new Date(date).toLocaleDateString("lt-LT");
};

export const randomBetweenValues = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getFormattedTimeFromMs = (timeMs: number) => {

    const hours = Math.floor(timeMs / (1000 * 60 * 60));
    const minutes = Math.floor(timeMs / (1000 * 60)) % 60;
    const seconds = Math.floor(timeMs / 1000) % 60;

    return `${hours} h ${minutes} min ${seconds} s`;
}

export const appendModifiedYoutubeLink = (value: string) => {
    return `https://www.youtube.com/embed/${value}`;
}

export const NO_RESPONSE_LABEL = "No response from server";
