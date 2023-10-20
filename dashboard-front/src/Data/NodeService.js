export const NodeService = {
    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    sucursal: 'Pablo Valdez',
                    peso: '120,000kg',
                    volumen: '20 mt3'
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            numG: 'PVD-001',
                            emb: 'Si',
                            peso: '1 kg',
                            volumen: '10 mt3'
                        },
                    },
                    {
                        key: '0-1',
                        data: {
                            numG: 'PVD-002',
                            emb: 'No',
                            peso: '1 kg',
                            volumen: '10 mt3'
                        }
                    },
                    {
                        key: '0-2',
                        data: {
                            numG: 'PVD-002',
                            emb: 'No',
                            peso: '1 kg',
                            volumen: '10 mt3'
                        }
                    },
                ]
            },
            {
                key: '1',
                data: {
                    sucursal: 'Patria',
                    peso: '20,000kg',
                    volumen: '20 mt3'
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            numG: 'PAT-001',
                            emb: 'No',
                            peso: '1 kg',
                            volumen: '10 mt3'
                        }
                    },
                    {
                        key: '1-1',
                        data: {
                            numG: 'PAT-002',
                            emb: 'Si',
                            peso: '3 kg',
                            volumen: '30 mt3'
                        }
                    }
                ]
            },
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
