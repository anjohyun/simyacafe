import { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

interface ISBNScannerProps {
  onDetected: (isbn: string) => void;
  onClose: () => void;
}

export default function ISBNScanner({ onDetected, onClose }: ISBNScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader', 'ean_8_reader'],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error('Quagga initialization failed:', err);
          setError('카메라를 시작할 수 없습니다. 권한을 확인해주세요.');
          return;
        }
        setIsInitialized(true);
        Quagga.start();
      }
    );

    const handleDetected = (result: any) => {
      if (result && result.codeResult && result.codeResult.code) {
        const code = result.codeResult.code;
        // ISBN-13 (EAN-13) or ISBN-10 validation
        if (code.length === 13 || code.length === 10) {
          onDetected(code);
          Quagga.stop();
        }
      }
    };

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: '20px',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}
          >
            📷 ISBN 바코드 스캔
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: '#DDDDDD',
              fontWeight: '600',
            }}
          >
            책 뒷면의 바코드를 카메라에 비춰주세요
          </p>
        </div>

        {error ? (
          <div
            style={{
              padding: '20px',
              background: 'rgba(255, 27, 141, 0.2)',
              border: '2px solid #FF1B8D',
              borderRadius: '16px',
              color: '#FF1B8D',
              textAlign: 'center',
              fontWeight: '700',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        ) : (
          <div
            ref={scannerRef}
            style={{
              width: '100%',
              height: '480px',
              background: '#000000',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '4px solid #00FFC6',
              position: 'relative',
            }}
          >
            {!isInitialized && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
              >
                카메라 로딩 중...
              </div>
            )}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            취소
          </button>
        </div>

        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            background: 'rgba(255, 228, 0, 0.1)',
            border: '1px solid rgba(255, 228, 0, 0.3)',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#FFE400',
              fontWeight: '600',
              lineHeight: '1.6',
            }}
          >
            💡 팁: 바코드가 잘 인식되지 않으면 조명을 밝게 하거나 카메라와의 거리를
            조절해보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
