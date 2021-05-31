/* */

const COMMANDS = {
  move: {
    min: 1,
    max: 1,
    params: {
      "-up": { required: false, min: 0, max: 1 },
      "-down": { required: false, min: 0, max: 1 },
      "-left": { required: false, min: 0, max: 1 },
      "-right": { required: false, min: 0, max: 1 },
    },
  },
  help: {
    params: {},
  },
};

function validate(tree) {
  const { command, params } = tree;
  /* is existing command */
  if (!(command in COMMANDS)) {
    throw new Error(`Commande non implémentée ${command}`);
  }
  const { params: dico, min, max } = COMMANDS[command];
  /*  params required */
  Object.entries(dico).forEach(function (name, { required }) {
    if (required && !(name in params)) {
      throw new Error(`parametre manquant ${name}`);
    }
  });

  /* unkonw params */
  Object.keys(params).forEach(function (name) {
    if (!(name in dico)) {
      throw new Error(`parametre inconnu ${name}`);
    }
  });

  /* nb params */
  if (max !== undefined && min !== undefined) {
    const nb = Object.keys(params).length;
    if (nb < min || nb > max) {
      throw new Error(`Entre ${min} et ${max} paramétre(s) attendu(s)`);
    }
  }
}

export default validate;
