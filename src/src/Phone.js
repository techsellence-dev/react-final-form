import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function App() {
    const [phone, setPhone] = useState("");

    return (
        <PhoneInput
            country={"eg"}
            enableSearch={true}
            value={phone}
            onChange={(phone) => setPhone(phone)}
        />
    );
} ;