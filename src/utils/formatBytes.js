const formatBytes = (bytes) => {
    const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];
    let unitIndex = 0;
    let value = bytes;

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex++;
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: units[unitIndex],
        unitDisplay: 'short',
        maximumFractionDigits: 2
    });

    return formatter.format(value);
}


export default formatBytes
