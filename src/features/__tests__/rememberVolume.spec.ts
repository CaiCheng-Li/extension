import { expect, test } from "@playwright/test";

import type { YouTubePlayerDiv } from "@/src/types";

import { setRememberedVolume } from "../rememberVolume/utils";

function createMockPlayer() {
	let capturedVolume: number | undefined;
	const player = {
		setVolume: async (vol: number) => {
			capturedVolume = vol;
		},
	} as unknown as YouTubePlayerDiv;
	return { getCapturedVolume: () => capturedVolume, player };
}

test.describe("rememberVolume", () => {
	test("video volume should be remembered on watch", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: player,
			rememberedVolumes: { watchPageVolume: 75 },
		});
		expect(getCapturedVolume()).toBe(75);
	});

	test("video volume should be remembered on live", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: player,
			rememberedVolumes: { watchPageVolume: 80 },
		});
		expect(getCapturedVolume()).toBe(80);
	});

	test("video volume should be remembered on shorts", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: true,
			isWatchPage: false,
			playerContainer: player,
			rememberedVolumes: { shortsPageVolume: 60 },
		});
		expect(getCapturedVolume()).toBe(60);
	});

	test("video volume should be remembered across multiple navigations", async () => {
		const { getCapturedVolume: getWatch1, player: watch1 } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: watch1,
			rememberedVolumes: { shortsPageVolume: 55, watchPageVolume: 70 },
		});
		expect(getWatch1()).toBe(70);

		const { getCapturedVolume: getShorts, player: shorts } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: true,
			isWatchPage: false,
			playerContainer: shorts,
			rememberedVolumes: { shortsPageVolume: 55, watchPageVolume: 70 },
		});
		expect(getShorts()).toBe(55);

		const { getCapturedVolume: getWatch2, player: watch2 } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: true,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: watch2,
			rememberedVolumes: { shortsPageVolume: 55, watchPageVolume: 70 },
		});
		expect(getWatch2()).toBe(70);
	});

	test("video volume shouldn't be remembered when disabled on watch", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: false,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: player,
			rememberedVolumes: { watchPageVolume: 75 },
		});
		expect(getCapturedVolume()).toBeUndefined();
	});

	test("video volume shouldn't be remembered when disabled on live", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: false,
			isShortsPage: false,
			isWatchPage: true,
			playerContainer: player,
			rememberedVolumes: { watchPageVolume: 80 },
		});
		expect(getCapturedVolume()).toBeUndefined();
	});

	test("video volume shouldn't be remembered when disabled on shorts", async () => {
		const { getCapturedVolume, player } = createMockPlayer();
		await setRememberedVolume({
			enableRememberVolume: false,
			isShortsPage: true,
			isWatchPage: false,
			playerContainer: player,
			rememberedVolumes: { shortsPageVolume: 60 },
		});
		expect(getCapturedVolume()).toBeUndefined();
	});

	test("video volume should be remembered at different levels on watch", async () => {
		for (const level of [25, 50, 75, 100]) {
			const { getCapturedVolume, player } = createMockPlayer();
			await setRememberedVolume({
				enableRememberVolume: true,
				isShortsPage: false,
				isWatchPage: true,
				playerContainer: player,
				rememberedVolumes: { watchPageVolume: level },
			});
			expect(getCapturedVolume()).toBe(level);
		}
	});

	test("video volume should be remembered at different levels on live", async () => {
		for (const level of [25, 50, 75, 100]) {
			const { getCapturedVolume, player } = createMockPlayer();
			await setRememberedVolume({
				enableRememberVolume: true,
				isShortsPage: false,
				isWatchPage: true,
				playerContainer: player,
				rememberedVolumes: { watchPageVolume: level },
			});
			expect(getCapturedVolume()).toBe(level);
		}
	});

	test("video volume should be remembered at different levels on shorts", async () => {
		for (const level of [25, 50, 75, 100]) {
			const { getCapturedVolume, player } = createMockPlayer();
			await setRememberedVolume({
				enableRememberVolume: true,
				isShortsPage: true,
				isWatchPage: false,
				playerContainer: player,
				rememberedVolumes: { shortsPageVolume: level },
			});
			expect(getCapturedVolume()).toBe(level);
		}
	});
});
