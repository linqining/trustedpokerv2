export interface StateData {
    type: string
    from: string
    action: string
    room: Room
}

export interface Room {
    id: string
    sb: number
    bb: number
    timeout: number
    button: number
    occupants: Occupant[]
    chips: number[]
    bet: number
    n: number
    max: number
    maxchips: number
    minchips: number
    cards?:string[];
    pot?:number[];
}

export interface Occupant {
    id: string
    name: string
    profile: string
    level: number
    chips: number
    index: number
    action?: string
    reveal_cards?: RevealCard[]
    bet?: number
    cards?: string[]
    hand:number
}

export interface RevealCard {
    card: string
    reveal_tokens: RevealToken[]
}

export interface RevealToken {
    token: string
    proof: Proof
    public_key: string
}

export interface Proof {
    a: string
    b: string
    r: string
}


export interface ButtonData {
    type: string
    from: string
    action: string
    class: string
}

export interface BetData {
    id: string
    type: string
    from: string
    action: string
    class: string
}

export interface PotData {
    type: string
    from: string
    action: string
    class: string
}

export interface ActionData {
    type: string
    from: string
    action: string
    class: string
}


export interface PreFlopData {
    type: string
    from: string
    action: string
    class: string
}

export interface JoinData {
    type: string
    from: string
    action: string
    occupant: Occupant
}

export interface ShowDownData {
    type: string
    from: string
    action: string
    room: Room
}


export interface RevealCard {
    card: string
    reveal_tokens: RevealToken[]
}

export interface RevealToken {
    token: string
    proof: Proof
    public_key: string
}

export interface Proof {
    a: string
    b: string
    r: string
}

export interface PotData {
    type: string
    from: string
    action: string
    class: string
}






