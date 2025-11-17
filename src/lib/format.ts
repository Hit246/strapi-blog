const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export const formatDate = (date: string) => dateFormatter.format(new Date(date));

