declare module '@semantic-release/error' {
  class SemanticReleaseError {
    private readonly message: any
    private readonly code: any
    private readonly details: any

    constructor (
      message?: any,
      code?: any,
      details?: any,
    )
  }

  export = SemanticReleaseError
}
