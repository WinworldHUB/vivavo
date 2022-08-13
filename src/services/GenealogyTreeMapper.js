export const GenealogyTreeMapper = {
  transpose: function (rawData = []) {
    // Raw Data Structure
    /**
     * Root Node
     * - Child 1
     * -- Child 11
     * -- Child 12
     * - Child 2
     * -- Child 21
     * -- Child 22
     * - Child 3
     * -- Child 31
     * -- Child 32
     * -- Child 33
     * 
     * Transposed output
     * Root Node
     * - Child 1
     * -- Child 11
     * -- Add Node (Third Organization)
     * -- Child 12
     * - Child 2
     * -- Child 21
     * -- Add Node (Third Organization)
     * -- Child 22
     * - Add Node (Third Organization)
     * - Child 3
     * -- Child 31
     * -- Child 32
     * -- Add Node (Third Organization)
     * -- Child 33
     * 
     */
  },
};
