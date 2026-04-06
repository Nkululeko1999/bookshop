export const formatDate = (date?: string | Date) => {
        if (!date) return 'Member since: Recently';
        
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
