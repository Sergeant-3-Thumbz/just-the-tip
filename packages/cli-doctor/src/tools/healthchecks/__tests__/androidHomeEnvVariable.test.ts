import androidHomeEnvVariables from '../androidHomeEnvVariable';
import {NoopLoader} from '@react-native-community/cli-tools';
import {EnvironmentInfo} from '../../../types';

import * as common from '../common';

const logSpy = jest.spyOn(common, 'logManualInstallation');
const {logManualInstallation} = common;

describe('androidHomeEnvVariables', () => {
  const OLD_ENV = process.env;
  let environmentInfo: EnvironmentInfo;

  afterEach(() => {
    process.env = OLD_ENV;
    jest.resetAllMocks();
  });

  it('returns true if no ANDROID_HOME is defined', async () => {
    delete process.env.ANDROID_HOME;

    const diagnostics = await androidHomeEnvVariables.getDiagnostics(
      environmentInfo,
    );
    expect(diagnostics.needsToBeFixed).toBe(true);
  });

  it('returns false if ANDROID_HOME is defined', async () => {
    process.env.ANDROID_HOME = '/fake/path/to/android/home';

    const diagnostics = await androidHomeEnvVariables.getDiagnostics(
      environmentInfo,
    );
    expect(diagnostics.needsToBeFixed).toBe(false);
  });

  it('logs manual installation steps to the screen', async () => {
    const loader = new NoopLoader();
    delete process.env.ANDROID_HOME;

    androidHomeEnvVariables.runAutomaticFix({
      loader,
      logManualInstallation,
      environmentInfo,
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
