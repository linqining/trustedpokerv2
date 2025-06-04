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
    occupants: Occupant | undefined[]
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

