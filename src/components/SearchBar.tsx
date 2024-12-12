import { TextField } from '@mui/material';
import { useState } from 'react';

type SearchBarProps = {
    setter: React.Dispatch<React.SetStateAction<string>>;
    bgColor: string;
};

export default function SearchBar({ setter, bgColor }: SearchBarProps) {
    let [query, setQuery] = useState<string>("");
    return (
        <TextField
            sx={{
                backgroundColor: bgColor,
                borderRadius: "5px",
            }}
            placeholder='Buscar ciudad'
            onChange={(event) => { setQuery(event.target.value) }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    setter(query);
                }
            }}
        />
    );
};