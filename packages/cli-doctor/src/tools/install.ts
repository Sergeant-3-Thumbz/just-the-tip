import {Loader} from '../types';
import {brewInstall} from './brewInstall';
import {logManualInstallation} from './healthchecks/common';

type InstallArgs = {
  pkg: string;
  label: string;
  url: string;
  loader: Loader;
};

async function install({pkg, label, url, loader}: InstallArgs) {
  try {
    switch (process.platform) {
      case 'darwin':
        await brewInstall({pkg, label, loader});
        break;
      default:
        throw new Error('Not implemented yet');
    }
  } catch (_error) {
    loader.fail();

    logManualInstallation({
      healthcheck: label,
      url,
    });
  }
}

export {install};
