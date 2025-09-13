
/// Module: notes
module notes::notes_v3;
use std::string::String;
use sui::clock::Clock;
use notes::data::{Self as df, Data};

public struct Note has key, store {
    id: UID,
    title: String,
    content: Data,
    timestamp: u64,
    owner: address,
}

public fun create(title: String, data: String, clock: &Clock, ctx: &mut TxContext): Note {
    let data = df::create(0, data);

    let note = Note {
        id: object::new(ctx),
        title,
        content: data,
        timestamp: clock.timestamp_ms(),
        owner: ctx.sender(),
    };

    note
}

public fun edit(note: &mut Note, content: String) {
    note.content.edit(content);
}

public fun seal_approve(note: &Note, ctx: &mut TxContext): bool {
    if (note.owner == ctx.sender()) { true } else { false }
}

// public fun delete(note: Note) {
//     let Note { id, .. } = note;
//     id.delete();
// }