
/// Module: notes
module notes::notes_v1;
use std::string::String;
use sui::clock::Clock;

public struct Note has key, store {
    id: UID,
    title: String,
    content: String,
    timestamp: u64,
}

public fun create(title: String, content: String, clock: &Clock, ctx: &mut TxContext): Note {
    let note = Note {
        id: object::new(ctx),
        title,
        content,
        timestamp: clock.timestamp_ms(),
    };

    note
}

public fun edit(note: &mut Note, content: String) {
    note.content = content;
}

public fun delete(note: Note) {
    let Note { id, .. } = note;
    id.delete();
}