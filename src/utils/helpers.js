import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useCheckAllowance } from "../hooks/dataSender/Allowance";
import { useApprove } from "../hooks/dataSender/Approval";
import { useEffect, useState } from "react";

export const TimeInterval = {
    SECOND: 'second',
    MINUTE: 'minute',
    FIVE_MINUTES: 'five_minutes',
    FIFTEEN_MINUTES: 'fifteen_minutes',
    THIRTY_MINUTES: 'thirty_minutes',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEK: 'week',
    MONTHLY: 'monthly',
    QUARTER: 'quarter',
    YEAR: 'year',
};

export const formatEthinDollar = (market, eth) => {
    const value = market * eth;
    const formatedDollarValue = formatMarketCap(value)
    return formatedDollarValue;
};

export const formatMarketCap = (value) => {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2).replace(/\.0$/, '') + 'B';
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2).replace(/\.0$/, '') + 'K';
    } else {
        return value.toFixed(2);
    }
};

export const useHandleAllowanceCheck = () => {
    const checkAllowance = useCheckAllowance()
    const approve = useApprove()
    const isAllowanceRequired = async (tradingAmount, userGemsBalance) => {
        try {
            const allowanceBalance = await checkAllowance()
            if (Number(allowanceBalance) < Number(tradingAmount)) {
                await approve(userGemsBalance)
            }
            return true
        }
        catch (error) {
            console.error("Check Allowance error:", error);
        }
    }
    return { isAllowanceRequired }
}

export const getTransactionHash = (hash) => {
    return `https://arbiscan.io/tx/${hash}`
}

export const getFormatedWeb3Address = (address, isWalletAddress) => {
    if (isWalletAddress) {
        return `${address?.substring(0, 6)}...${address?.substring(38)}`;
    }
    else {
        return `${address?.substring(0, 6)}...${address?.substring(62)}`;
    }
}

export const handleShare = async (link) => {
    if (navigator.share) {
        try {
            await navigator.share({
                url: link,
            });
        } catch (error) {
            console.error("Error sharing:", error);
        }
    } else {
        console.log("Web Share API not supported in this browser.");
    }
};

export const getTimeInAges = (time) => {
    const lastUpdated = time
        ? formatDistanceToNow(new Date(time), { addSuffix: true })
            .replace("about ", "")
            .replace("less than a", "<1")
            .replace(" hours", "h")
            .replace(" hour", "h")
            .replace(" minutes", "m")
            .replace(" minute", "m")
            .replace(" month", "mo")
            .replace(" months", "mo")
            .replace(" days", "d")
            .replace(" day", "d")
            .replace(" Year", "y")
            .replace(" Years", "y")
        : "Unknown time";
    return lastUpdated
}

export const formatTokenPrice = (price, ethPrice) => {
    if (price === 0) return "0.00";
    if (price >= 1) return price.toFixed(2);
    const value = price * ethPrice;
    const exponent = Math.floor(Math.log10(value));
    const absExponent = Math.abs(exponent);

    if (absExponent - 1 >= 4) {
        const significant = (value / Math.pow(10, exponent)).toFixed(10);
        const formattedNumber = significant.replace(".", "").slice(0, 4);

        return (
            <span style={{ fontSize: "14px" }}>
                0.0<sub style={{ fontSize: "8px", verticalAlign: "middle" }}>
                    {absExponent - 1}
                </sub>{formattedNumber}
            </span>
        );
    } else {
        return price.toFixed(absExponent + 2);
    }
};

export const useDebounce = (value, delay = 700) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};