export interface RefStore {

  /**
   * Save a reference.
   * @param ref reference to save. eg: ID from file store
   */
  saveRef(ref: any): Promise<RefId>,
}

export type RefId = any
