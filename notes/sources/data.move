#[allow(unused_const)]
module notes::data;
use std::string::String;


const TEXT: u8 = 0;
const EN_TEXT: u8 = 1;

public struct Data has store {
    data_type: u8,
    value: String,
}


public fun create(data_type: u8, value: String): Data {
    let data = Data {
        data_type,
        value,
    };

    data
}

public fun edit(data: &mut Data, content: String) {
    data.value = content;
}