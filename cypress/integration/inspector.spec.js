import {
  StorageProviderType
} from '@/constants/StorageProviderType';
import { UpdateMode } from '@/constants/UpdateMode';


describe('Inspector tokens', () => {
  const mockStartupParams = {
    activeTheme: null,
    lastOpened: Date.now(),
    onboardingExplainer: {
      sets: true,
      inspect: true,
      syncProviders: true,
    },
    localApiProviders: [],
    licenseKey: null,
    settings: {
      width: 800,
      height: 500,
      ignoreFirstPartForStyles: false,
      inspectDeep: false,
      prefixStylesWithThemeName: false,
      showEmptyGroups: true,
      updateMode: UpdateMode.PAGE,
      updateOnChange: false,
      updateRemote: true,
      updateStyles: true,
    },
    storageType: { provider: StorageProviderType.LOCAL },
    user: {
      figmaId: 'figma:1234',
      userId: 'uid:1234',
      name: 'Jan Six',
    },
    localTokenData: {
      activeTheme: null,
      checkForChanges: false,
      themes: [],
      usedTokenSet: {},
      updatedAt: new Date().toISOString(),
      values: {
      },
      version: '91',
    },
  }

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage');
      },
    });
    cy.waitForReact(1000);
  });

  it('successfully shows tokens applied on the node', () => {
    cy.startup(mockStartupParams);
    cy.get('[data-cy="button-configure"]').should('be.visible');
    cy.receiveSetTokens({
      version: '5',
      values: {
        options: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        },
        {
          name: 'opacity.50',
          value: '50%',
          type: 'opacity'
        },
        {
          name: 'font-size.12',
          value: '12px',
          type: 'fontSize'
        }
        ],
        global: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
      },
    });
    cy.receiveSelectionValues({
      selectionValues: [{
        category: "sizing",
        type: "sizing",
        value: "sizing.xs",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "opacity",
        type: "opacity",
        value: "opacity.50",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "fontSize",
        type: "fontSize",
        value: "font-size.12",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      ],
      selectedNodes: 1,
      mainNodeSelectionValues: {
        sizing: "sizing.xs",
        opacity: "opacity.50",
        fontSize: "font-size.12",
      }
    });
    cy.get('[data-cy=navitem-inspector]').click({
      timeout: 1000
    });
    cy.contains('sizing.xs');
    cy.contains('opacity.50');
    cy.contains('font-size.12');
  });

  it('successfully remaps a token', () => {
    cy.startup(mockStartupParams);
    cy.get('[data-cy="button-configure"]').should('be.visible');
    cy.receiveSetTokens({
      version: '5',
      values: {
        options: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        },
        {
          name: 'opacity.50',
          value: '50%',
          type: 'opacity'
        },
        {
          name: 'opacity.100',
          value: '100%',
          type: 'opacity'
        },
        {
          name: 'font-size.12',
          value: '12px',
          type: 'fontSize'
        }
        ],
        global: [{
          name: 'sizing.xs',
          value: 4,
          type: 'sizing'
        }],
      },
    });
    cy.receiveSelectionValues({
      selectionValues: [{
        category: "sizing",
        type: "sizing",
        value: "sizing.xs",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "opacity",
        type: "opacity",
        value: "opacity.50",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "fontSize",
        type: "fontSize",
        value: "font-size.12",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      ],
      selectedNodes: 1,
      mainNodeSelectionValues: {
        sizing: "sizing.xs",
        opacity: "opacity.50",
        fontSize: "font-size.12",
      }
    });
    cy.get('[data-cy=navitem-inspector]').click({
      timeout: 1000
    });
    cy.get('[data-cy=inspector-token-single-opacity] [data-cy=button-token-remap]').click();
    cy.get(`input[name=value]`).type('$opacity.100').type('{enter}');
    cy.receiveSelectionValues({
      selectionValues: [{
        category: "sizing",
        type: "sizing",
        value: "sizing.xs",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "opacity",
        type: "opacity",
        value: "opacity.100",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      {
        category: "fontSize",
        type: "fontSize",
        value: "font-size.12",
        nodes: [{
          id: "1",
          name: "Rectangle",
          type: "RECTANGLE",
        }],
      },
      ],
      selectedNodes: 1,
      mainNodeSelectionValues: {
        sizing: "sizing.xs",
        opacity: "opacity.100",
        fontSize: "font-size.12",
      }
    });

    cy.contains('opacity.50').should('not.exist');
    cy.contains('opacity.100');
  });
});