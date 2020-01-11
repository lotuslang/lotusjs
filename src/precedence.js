exports.Precedence =
{
    Comma: 1,
    Parenthesis: 1,
    Curly: 1,

    Assignment: 2,
    Declaration: 2,

    Enumeration: 3,

    LogicalOR: 4,

    LogicalAND: 5,

    Equal: 6,
    NotEqual: 6,

    LessThan: 7,
    GreaterThan: 7,
    LessThanOrEqual: 7,
    GreaterThanOrEqual: 7,

    Addition: 8,
    Subtraction: 8,

    Multiplication: 9,
    Division: 9,
    Modulo: 9,

    Power: 10,

    Unary: 11,
    Access: 11,
    ArrayAccess: 11,

    FunctionCall: 12,
    Loop: 12,
    IfElse: 12
}