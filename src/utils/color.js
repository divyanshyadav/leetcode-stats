import { COLORS, SECONDS } from '../constants';

export function getColorByTimeRange(seconds) {
    if (seconds < SECONDS.THIRTY_MIN) {
        return COLORS.GREEN;
    }

    if ((seconds) >= SECONDS.THIRTY_MIN && seconds <= SECONDS.ONE_HOUR) {
        return COLORS.YELLOW;
    }

    return COLORS.RED;
}
